package main

import (
	"backend/routes"
	"fmt"
	"log"
	"net/http"
)

const port = 8080

func main() {
	log.Println("Server starting on port :", port)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), routes.Routes())
	if err != nil {
		log.Fatal(err)
	}
}
