package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	gtranslate "github.com/miphik/google-translate"
)

func main() {
	translator := gtranslate.NewTranslator(&http.Client{})
	value := gtranslate.Translate{
		Text: "stood out",
		// From: "id",
		To: "ru",
	}
	translated, err := translator.Translator(value)
	if err != nil {
		panic(err)
	} else {
		prettyJSON, err := json.MarshalIndent(translated, "", "\t")
		if err != nil {
			panic(err)
		}
		fmt.Println(string(prettyJSON))
	}
}
