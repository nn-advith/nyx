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

func (a *App) LoadFromDB() string {
	return projecthandler.LoadDataFromDB()
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
