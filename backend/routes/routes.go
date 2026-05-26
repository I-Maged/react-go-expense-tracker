package routes

import (
	"backend/config"
	"backend/controllers"
	"backend/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Routes() http.Handler {
	config.ConnectDB()

	r := gin.Default()

	r.Use(middleware.CORSMiddleware())

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.Register)
			auth.POST("/login", controllers.Login)
		}

		transactions := api.Group("/transactions")
		transactions.Use(middleware.AuthMiddleware())
		{
			transactions.GET("", controllers.GetTransactions)
			transactions.POST("", controllers.CreateTransaction)
			transactions.DELETE("/:id", controllers.DeleteTransaction)
		}
	}

	return r
}
