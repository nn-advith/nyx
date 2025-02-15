package projecthandler

import (
	"encoding/json"
	"fmt"
	"os"
	"os/user"
	"strconv"
	"strings"
	"sync"
	"time"

	"golang.org/x/sys/windows/registry"
	// "path/filepath"
)

var INSTALLATION_PATH string // needs to be in a config that is written during installation
var DATABASE_DIR string
var CONF_DIR string
var JSON_FILE_PATH string
var COUNTER_FILE string

var mutex sync.Mutex

//datamodel

func GetUsername() string {
	currentUser, err := user.Current()
	if err != nil {
		return "UnknownUser"
	}
	parts := strings.Split(currentUser.Username, `\`)
	return parts[len(parts)-1]
}

func getInstallDirectory() string {
	k, err := registry.OpenKey(registry.CURRENT_USER, `Software\Nyx`, registry.QUERY_VALUE)
	var dataDir string
	if err != nil {
		fmt.Println("Error opening registry:", err)
		dataDir = `C:\Users\` + GetUsername() + `\AppData\Roaming\Nyx`
	} else {
		defer k.Close()
		dataDir, _, err = k.GetStringValue("DataDir")
		if err != nil || dataDir == "" {
			fmt.Println("Error reading DataDir from registry, using default.")
			dataDir = `C:\Users\` + GetUsername() + `\AppData\Roaming\Nyx`
		}
	}

	// Ensure the directory is created
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		fmt.Println("Failed to create data directory:", err)
	}
	return dataDir
}

func init() {
	INSTALLATION_PATH = getInstallDirectory()
	// _ = os.MkdirAll(INSTALLATION_PATH, 0755)
	// INSTALLATION_PATH = "D:/Programming/TestDir" // this shit needs to be updated from registry
	DATABASE_DIR = "/data"
	CONF_DIR = "/conf"
	JSON_FILE_PATH = INSTALLATION_PATH + DATABASE_DIR + "/workspace.json"
	COUNTER_FILE = INSTALLATION_PATH + CONF_DIR + "/counter.json"
	err := checkIfConfDirectoryExists()
	if err != nil {
		fmt.Println(err.Error())
	} else {
		err = checkIfCounterFileExists()
		if err != nil {
			fmt.Println(err.Error())
		}
	}
}

type Workspace struct {
	Projectlist []Project `json:"projectlist"`
}

type Task struct {
	Tid      string `json:"tid"`
	Name     string `json:"name"`
	Status   string `json:"status"`
	Created  string `json:"created"`
	Deadline string `json:"deadline"`
}

type Project struct {
	Pid      string `json:"pid"`
	Name     string `json:"name"`
	Created  string `json:"created"`
	Deadline string `json:"deadline"`
	Tasklist []Task `json:"tasklist"`
}

type counter struct {
	Count int `json:"count"`
}

func checkIfDataDirectoryExists() error {
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

func checkIfConfDirectoryExists() error {
	info, err := os.Stat(INSTALLATION_PATH + CONF_DIR)
	if os.IsNotExist(err) {
		err = os.MkdirAll(INSTALLATION_PATH+CONF_DIR, 0755)
		if err != nil {
			return fmt.Errorf("error creating directory at path %s", INSTALLATION_PATH+CONF_DIR)
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

func checkIfCounterFileExists() error {
	data := map[string]int{
		"count": 0,
	}

	jsondata, err := json.MarshalIndent(data, "", " ")
	if err != nil {
		return fmt.Errorf("unable to convert counter data to json")
	}
	_, err = os.Stat(COUNTER_FILE)
	if os.IsNotExist(err) {
		file, err := os.Create(COUNTER_FILE)
		if err != nil {
			return fmt.Errorf("error creating conf counter file")
		}
		defer file.Close()

		_, err = file.Write(jsondata)
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

func getCounterVal() int {
	file, err := os.Open(COUNTER_FILE)
	if err != nil {
		panic("error while opening counter file")
	}
	defer file.Close()
	var c counter

	if err = json.NewDecoder(file).Decode(&c); err != nil {
		panic("error decoding counter value")
	}
	return c.Count
}

func setCounterVal(count int) {
	updatedCounter := map[string]int{
		"count": count,
	}
	jsondata, err := json.MarshalIndent(updatedCounter, "", " ")
	if err != nil {
		panic("unable to convert counter data to json")
	}
	err = os.WriteFile(COUNTER_FILE, jsondata, 0755)
	if err != nil {
		panic("Unable to write into counter file")
	}
}

func LoadDataFromDB() string {

	err := checkIfDataDirectoryExists()
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

// func padstring(s string, rl int, pc rune) string {

// }

func getProjectID() string {
	//get timestamp
	//read counter and increment by one, update counter
	//combine to get id
	ts := fmt.Sprintf("%d", time.Now().Unix())

	mutex.Lock()
	c := getCounterVal()
	c = c + 1
	setCounterVal(c)
	mutex.Unlock()

	c_str := strconv.Itoa(c)
	project_id := fmt.Sprintf("%s-%s", ts, c_str)
	return project_id
}

func getTaskId(pid string) string {
	//get timestamp
	//read counter and increment by one, update counter
	//combine pid, timestamp and incremented counter value
	ts := fmt.Sprintf("%d", time.Now().Unix())

	mutex.Lock()
	c := getCounterVal()
	c = c + 1
	setCounterVal(c)
	mutex.Unlock()

	c_str := strconv.Itoa(c)
	task_id := fmt.Sprintf("%s-%s-%s", ts, pid, c_str)
	return task_id
}

func getTodayDate() string {
	return time.Now().Format("2006-01-02")
}

func CreateNewProject(name string, deadline string) {
	//getnewproject id
	//create a new project with pid and name, empty task list
	//read existing projects, append project to the list
	//write back to file, assume locking
	pid := getProjectID()
	created := getTodayDate()
	newproject := Project{
		Pid:      pid,
		Name:     name,
		Created:  created,
		Deadline: deadline,
		Tasklist: []Task{},
	}

	file, err := os.Open(JSON_FILE_PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var ws Workspace

	if derr := json.NewDecoder(file).Decode(&ws); derr != nil {
		panic(derr)
	}

	ws.Projectlist = append(ws.Projectlist, newproject)
	updated, err := json.MarshalIndent(ws, "", " ")
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(JSON_FILE_PATH, updated, 0755)
	if err != nil {
		panic("unable to update the new project")
	}

}

func DeleteProjectFromId(id string) {
	//get id
	//read from file and find the project matching the id ; effiecient ??
	//rewrite and load on frontend
	file, err := os.Open(JSON_FILE_PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var ws Workspace

	if derr := json.NewDecoder(file).Decode(&ws); derr != nil {
		panic(derr)
	}

	// var found bool;
	for i := 0; i < len(ws.Projectlist); i++ { //optimize using maps
		if ws.Projectlist[i].Pid == id {
			ws.Projectlist = append(ws.Projectlist[:i], ws.Projectlist[i+1:]...)
			// found = true
			break
		}
	}

	updated, err := json.MarshalIndent(ws, "", " ")
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(JSON_FILE_PATH, updated, 0755)
	if err != nil {
		panic("unable to update the new project")
	}

}

func CreateNewTask(pid string, name string, deadline string) {
	// getTaskId()
	//search for pid in project list
	//create new task and append to tasklist of the project
	//reload

	newtaskid := getTaskId(pid)
	created := getTodayDate()
	newtask := Task{
		Tid:      newtaskid,
		Name:     name,
		Status:   "pending",
		Created:  created,
		Deadline: deadline,
	}

	var ws Workspace

	file, err := os.Open(JSON_FILE_PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&ws)
	if err != nil {
		panic("unable to decode from file")
	}

	for i := range len(ws.Projectlist) {
		if ws.Projectlist[i].Pid == pid {
			ws.Projectlist[i].Tasklist = append(ws.Projectlist[i].Tasklist, newtask)
			break
		}
	}

	updated, err := json.MarshalIndent(ws, "", " ")
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(JSON_FILE_PATH, updated, 0755)
	if err != nil {
		panic("unable to update the new project")
	}

}

func getPidFromTid(tid string) string {
	return strings.Join(strings.Split(tid, "-")[1:3], "-")
}

func UpdateTaskState(tid string, newstate string) {
	//find task with tid within pid
	//update status and write back
	var ws Workspace
	pid := getPidFromTid(tid)
	file, err := os.Open(JSON_FILE_PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&ws)
	if err != nil {
		panic("unable to decode from file")
	}

	for i := range ws.Projectlist {
		if ws.Projectlist[i].Pid == pid {
			for j := range ws.Projectlist[i].Tasklist {
				if ws.Projectlist[i].Tasklist[j].Tid == tid {
					ws.Projectlist[i].Tasklist[j].Status = newstate
					break
				}
			}
			break
		}
	}

	updated, err := json.MarshalIndent(ws, "", " ")
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(JSON_FILE_PATH, updated, 0755)
	if err != nil {
		panic("unable to update the new project")
	}

}

func DeleteTask(tid string) {
	var ws Workspace
	pid := getPidFromTid(tid)
	file, err := os.Open(JSON_FILE_PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&ws)
	if err != nil {
		panic("unable to decode from file")
	}

	for i := range ws.Projectlist {
		if ws.Projectlist[i].Pid == pid {
			for j := range ws.Projectlist[i].Tasklist {
				if ws.Projectlist[i].Tasklist[j].Tid == tid {
					ws.Projectlist[i].Tasklist = append(ws.Projectlist[i].Tasklist[:j], ws.Projectlist[i].Tasklist[j+1:]...)
					break
				}
			}
			break
		}
	}

	updated, err := json.MarshalIndent(ws, "", " ")
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(JSON_FILE_PATH, updated, 0755)
	if err != nil {
		panic("unable to update the new project")
	}

}

func EditTask(tid string, name string, status string, deadline string) {
	var ws Workspace
	pid := getPidFromTid(tid)
	file, err := os.Open(JSON_FILE_PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&ws)
	if err != nil {
		panic("unable to decode from file")
	}

	for i := range ws.Projectlist {
		if ws.Projectlist[i].Pid == pid {
			for j := range ws.Projectlist[i].Tasklist {
				if ws.Projectlist[i].Tasklist[j].Tid == tid {
					ws.Projectlist[i].Tasklist[j].Name = name
					ws.Projectlist[i].Tasklist[j].Status = status
					ws.Projectlist[i].Tasklist[j].Deadline = deadline
					break
				}
			}
			break
		}
	}

	updated, err := json.MarshalIndent(ws, "", " ")
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(JSON_FILE_PATH, updated, 0755)
	if err != nil {
		panic("unable to update the new project")
	}
}
