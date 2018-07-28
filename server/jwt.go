package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
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

	if userData["email"] == "test@gmail.com" && userData["password"] == "tester" {
		claims := jwtData{
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(time.Hour).Unix(),
			},

			CustomClaims: map[string]string{
				"userid": "u1",
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

func runJWTServer() error {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/login", signin)
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
