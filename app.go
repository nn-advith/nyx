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

	fmt.Println("Application is shutting down now")
	// Perform cleanup tasks here
}

// interface

func (a *App) LoadFromDB() string {
	return projecthandler.LoadDataFromDB()
}

func (a *App) CreateNewProject(name string, deadline string) {
	projecthandler.CreateNewProject(name, deadline)
}

func (a *App) DeleteProject(id string) {
	projecthandler.DeleteProjectFromId(id)
}

func (a *App) CreateNewTask(pid string, name string, deadline string) {
	projecthandler.CreateNewTask(pid, name, deadline)
}

func (a *App) UpdateTaskState(tid string, newstate string) {
	projecthandler.UpdateTaskState(tid, newstate)
}

func (a *App) DeleteTask(tid string) {
	projecthandler.DeleteTask(tid)
}

func (a *App) EditTask(tid string, name string, status string, deadline string) {
	projecthandler.EditTask(tid, name, status, deadline)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
