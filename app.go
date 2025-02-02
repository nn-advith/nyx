package main

import (
	"context"
	"fmt"

	"nyx/projecthandler"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
func (a *App) shutdown(ctx context.Context) {

	fmt.Println("Application is shutting down!")
	// Perform cleanup tasks here
}

// interface

func (a *App) LoadFromDB() string {
	return projecthandler.LoadDataFromDB()
}

func (a *App) CreateNewProject(name string) {
	projecthandler.CreateNewProject(name)
}

func (a *App) DeleteProject(id string) {
	projecthandler.DeleteProjectFromId(id)
}

func (a *App) CreateNewTask(pid string, name string, allotted int) {
	projecthandler.CreateNewTask(pid, name, allotted)
}

func (a *App) UpdateTaskState(tid string, newstate string) {
	projecthandler.UpdateTaskState(tid, newstate)
}

func (a *App) DeleteTask(tid string) {
	projecthandler.DeleteTask(tid)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
