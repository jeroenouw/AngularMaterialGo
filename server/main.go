package main

import (
	"html/template"
	"log"
	"math/rand"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/joho/godotenv"
)

type user struct {
	userName  string
	password  []byte
	email     string
	firstName string
	lastName  string
	role      string
}

type session struct {
	un           string
	lastActivity time.Time
}

var (
	tpl               *template.Template
	dbUsers           = map[string]user{}
	dbSessions        = map[string]session{}
	dbSessionsCleaned time.Time
	hashLetters       = []int32("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
)

const sessionLength int = 60

func init() {
	// tpl = template.Must(template.ParseGlob("templates/*"))
	dbSessionsCleaned = time.Now()
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	// // Application serving at PORT 8080
	// go func() {
	// 	http.HandleFunc("/", index)
	// 	http.HandleFunc("/admin", admin)
	// 	http.HandleFunc("/signup", signup)
	// 	http.HandleFunc("/signin", signin)
	// 	http.HandleFunc("/signout", authorized(signout))
	// 	http.ListenAndServe(":8080", nil)
	// }()

	// Blockchain serving at PORT 3000
	go func() {
		t := time.Now()
		genesisBlock := block{}
		genesisBlock = block{0, t.String(), "", calculateHash(genesisBlock), "", difficulty, ""}
		spew.Dump(genesisBlock)

		mutex.Lock()
		blockchain = append(blockchain, genesisBlock)
		mutex.Unlock()
	}()
	log.Fatal(runServer())
}

func randomHash() string {
	h := make([]int32, 32)
	for i := range h {
		h[i] = hashLetters[rand.Intn(len(hashLetters))]
	}
	return string(h)
}
