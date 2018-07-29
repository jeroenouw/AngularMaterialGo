package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/rs/cors"
)

type jwtData struct {
	// Standard claims are the standard jwt claims from the IETF standard
	jwt.StandardClaims
	CustomClaims map[string]string `json:"custom,omitempty"`
}

const secret = "AngularMaterialGoLocalSecret"

func signin(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Println(err)
		http.Error(w, "Login failed!", http.StatusUnauthorized)
	}

	var userData map[string]string
	json.Unmarshal(body, &userData)

	if userData["email"] == "ngxmatgo@gmail.com" && userData["password"] == "jeroenouw" {
		claims := jwtData{
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(time.Hour).Unix(),
			},

			CustomClaims: map[string]string{
				// https://www.guidgenerator.com/online-guid-generator.aspx
				// Guid 1, Hyphens, RFC 7515, URL encode
				"UID": "1a678b49-0162-4cc6-8bdd-4e5b76c67249",
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString([]byte(secret))
		if err != nil {
			log.Println(err)
			http.Error(w, "Login failed!", http.StatusUnauthorized)
		}

		json, err := json.Marshal(struct {
			Token string `json:"token"`
		}{
			tokenString,
		})

		if err != nil {
			log.Println(err)
			http.Error(w, "Login failed!", http.StatusUnauthorized)
		}

		w.Write(json)
	} else {
		http.Error(w, "Unknown data!", http.StatusUnauthorized)
	}
}

func account(w http.ResponseWriter, req *http.Request) {
	authToken := req.Header.Get("Authorization")
	authArr := strings.Split(authToken, " ")

	if len(authArr) != 2 {
		log.Println("Authentication header is invalid: " + authToken)
		http.Error(w, "Request failed!", http.StatusUnauthorized)
	}

	jwtToken := authArr[1]
	claims, err := jwt.ParseWithClaims(jwtToken, &jwtData{}, func(token *jwt.Token) (interface{}, error) {
		if jwt.SigningMethodHS256 != token.Method {
			return nil, errors.New("Invalid signing algorithm")
		}
		return []byte(secret), nil
	})

	if err != nil {
		log.Println(err)
		http.Error(w, "Request failed!", http.StatusUnauthorized)
	}

	data := claims.Claims.(*jwtData)
	UID := data.CustomClaims["UID"]
	jsonData, err := getAccountData(UID)
	if err != nil {
		log.Println(err)
		http.Error(w, "Request failed!", http.StatusUnauthorized)
	}

	w.Write(jsonData)
}

func getAccountData(UID string) ([]byte, error) {
	myData := data{"1a678b49-0162-4cc6-8bdd-4e5b76c67249", "ngxmatgo@gmail.com", "genesisuser", "basic task"}
	json, err := json.Marshal(myData)
	if err != nil {
		return nil, err
	}

	return json, nil
}

func runJWTServer() error {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/login", signin)
	mux.HandleFunc("/api/account", account)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"},
	})
	handler := c.Handler(mux)

	httpAddr := os.Getenv("JWTADDR")
	log.Println("JWT listening on ", httpAddr, "/api")
	s := &http.Server{
		Addr:           ":" + httpAddr,
		Handler:        handler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	if err := s.ListenAndServe(); err != nil {
		return err
	}

	return nil
}
