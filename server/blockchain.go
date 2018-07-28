package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type block struct {
	Index      int
	Timestamp  string
	Data       data
	Hash       string
	PrevHash   string
	Difficulty int
	Nonce      string
}

type data struct {
	UID    string
	Email  string
	User   string
	Action string
}

var (
	mutex      = &sync.Mutex{}
	blockchain []block
)

const difficulty = 1

func calculateHash(block block) string {
	record := strconv.Itoa(block.Index) + block.Timestamp + block.Data.User + block.Data.Action + block.PrevHash + block.Nonce
	h := sha256.New()
	h.Write([]byte(record))
	hashed := h.Sum(nil)
	return hex.EncodeToString(hashed)
}

func generateBlock(oldBlock block, UID string, Email string, User string, Action string) (block, error) {
	var newBlock block

	t := time.Now()

	newBlock.Index = oldBlock.Index + 1
	newBlock.Timestamp = t.Format("2006-01-02 15:04:05")
	newBlock.Data.UID = UID
	newBlock.Data.Email = Email
	newBlock.Data.User = User
	newBlock.Data.Action = Action
	newBlock.PrevHash = oldBlock.Hash
	newBlock.Difficulty = difficulty

	for i := 0; ; i++ {
		hex := fmt.Sprintf("%x", i)

		newBlock.Nonce = hex
		if !isHashValid(calculateHash(newBlock), newBlock.Difficulty) {
			fmt.Println(calculateHash(newBlock), " mining...")
			time.Sleep(time.Second)
			continue
		} else {
			fmt.Println(calculateHash(newBlock), " block succesful")
			newBlock.Hash = calculateHash(newBlock)
			break
		}
	}

	return newBlock, nil
}

func isBlockValid(newBlock, oldBlock block) bool {
	if oldBlock.Index+1 != newBlock.Index {
		return false
	}

	if oldBlock.Hash != newBlock.PrevHash {
		return false
	}

	if calculateHash(newBlock) != newBlock.Hash {
		return false
	}

	return true
}

func isHashValid(hash string, difficulty int) bool {
	prefix := strings.Repeat("0", difficulty)
	return strings.HasPrefix(hash, prefix)
}

func replaceChain(newBlocks []block) {
	if len(newBlocks) > len(blockchain) {
		blockchain = newBlocks
	}
}

func respondWithJSON(w http.ResponseWriter, req *http.Request, code int, payload interface{}) {
	response, err := json.MarshalIndent(payload, "", " ")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("HTTP 500: Internal Server Error"))
		return
	}
	w.WriteHeader(code)
	w.Write(response)
}

func handleReadBlockchain(w http.ResponseWriter, req *http.Request) {
	bytes, err := json.MarshalIndent(blockchain, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	io.WriteString(w, string(bytes))
}

func handleWriteBlock(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var d data

	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&d); err != nil {
		respondWithJSON(w, req, http.StatusBadRequest, req.Body)
		return
	}
	defer req.Body.Close()

	mutex.Lock()
	newBlock, err := generateBlock(blockchain[len(blockchain)-1], d.UID, d.Email, d.User, d.Action)
	if err != nil {
		respondWithJSON(w, req, http.StatusInternalServerError, d)
		return
	}
	mutex.Unlock()

	if isBlockValid(newBlock, blockchain[len(blockchain)-1]) {
		blockchain = append(blockchain, newBlock)
		spew.Dump(blockchain)
	}

	respondWithJSON(w, req, http.StatusCreated, newBlock)
}

func makeMuxRouter() http.Handler {
	muxRouter := mux.NewRouter()
	muxRouter.HandleFunc("/api", handleReadBlockchain).Methods("GET")
	muxRouter.HandleFunc("/api", handleWriteBlock).Methods("POST")
	return muxRouter
}

func runBlockchainServer() error {
	mux := makeMuxRouter()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:4200"},
	})
	handler := c.Handler(mux)

	httpAddr := os.Getenv("BLOCKADDR")
	log.Println("Blockchain listening on ", httpAddr, "/api")
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
