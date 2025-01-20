package projecthandler

import (
	"encoding/json"
	"fmt"
	"os"
	// "path/filepath"
)

var INSTALLATION_PATH string // needs to be in a config that is written during installation
var DATABASE_DIR string
var JSON_FILE_PATH string

//datamodel

func init() {
	INSTALLATION_PATH = "D:/Programming/TestDir"
	DATABASE_DIR = "/data"
	JSON_FILE_PATH = INSTALLATION_PATH + DATABASE_DIR + "/workspace.json"
}

type Workspace struct {
	Projectlist []Project `json:"projectlist"`
}

type Task struct {
	Name    string `json:"name"`
	Status  string `json:"status"`
	Alloted int    `json:"alloted"`
	Spent   int    `json:"spent"`
}

type Project struct {
	Name     string `json:"name"`
	Tasklist []Task `json:"tasklist"`
}

func checkIfDirectoryExists() error {
	info, err := os.Stat(INSTALLATION_PATH + DATABASE_DIR)
	if os.IsNotExist(err) {
		err = os.MkdirAll(INSTALLATION_PATH+DATABASE_DIR, 0755)
		if err != nil {
			return fmt.Errorf("error creating directory at path %s", INSTALLATION_PATH+DATABASE_DIR)
		}
	} else if err != nil {
		return fmt.Errorf("error checking if directory is present")
	} else if !info.IsDir() {
		return fmt.Errorf("not a directory")
	} else {
		//do nothing
		return nil
	}
	return nil
}

func checkIfDataFileExists() error {

	data := map[string][]string{
		"projectlist": {},
	}

	init_json_content, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		return fmt.Errorf("error creating init json data")
	}

	_, err = os.Stat(JSON_FILE_PATH)
	if os.IsNotExist(err) {
		file, err := os.Create(JSON_FILE_PATH)
		if err != nil {
			return fmt.Errorf("error creating data file")
		}
		defer file.Close()

		_, err = file.Write(init_json_content)
		if err != nil {
			return fmt.Errorf("unable to write init json content into created file")
		}

	} else if err != nil {
		return fmt.Errorf("error while checking file status")
	} else {
		return nil
	}
	return nil
}

func LoadDataFromDB() string {

	err := checkIfDirectoryExists()
	if err != nil {
		//handle this
		fmt.Println("Failed to check if data directory exists")
	} else {
		err = checkIfDataFileExists()
		if err != nil {
			fmt.Println("Failed to check if data file exists")
		} else {
			file, err := os.Open(JSON_FILE_PATH)
			if err != nil {
				panic(err)
			}
			defer file.Close()

			var ws Workspace

			if derr := json.NewDecoder(file).Decode(&ws); derr != nil {
				fmt.Println(derr)
				return ""

			}
			jstring, _ := json.Marshal(ws)
			return string(jstring)
		}
	}
	return ""
}

// func Read() {
// 	fmt.Println(INSTALLATION_PATH, JSON_FILE_PATH)
// }
