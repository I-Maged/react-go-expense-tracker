package controllers

import (
	"net/http"
	"time"

	"backend/config"
	"backend/models"

	"github.com/gin-gonic/gin"
)

type TransactionInput struct {
	ID       string    `json:"id" binding:"required"`
	Type     string    `json:"type" binding:"required,oneof=INCOME EXPENSE"`
	Amount   float64   `json:"amount" binding:"required,gt=0"`
	Category string    `json:"category" binding:"required"`
	Date     time.Time `json:"date" binding:"required"`
	Note     string    `json:"note"`
}

func GetTransactions(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User context missing"})
		return
	}

	var transactions []models.Transaction
	err := config.DB.Where("user_id = ?", userID).Order("date desc").Find(&transactions).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch transactions"})
		return
	}

	c.JSON(http.StatusOK, transactions)
}

func CreateTransaction(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User context missing"})
		return
	}

	var input TransactionInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	transaction := models.Transaction{
		ID:       input.ID,
		UserID:   userID.(uint),
		Type:     input.Type,
		Amount:   input.Amount,
		Category: input.Category,
		Date:     input.Date,
		Note:     input.Note,
	}

	if err := config.DB.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save transaction"})
		return
	}

	c.JSON(http.StatusCreated, transaction)
}

func DeleteTransaction(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User context missing"})
		return
	}

	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Transaction ID is required"})
		return
	}

	var transaction models.Transaction
	err := config.DB.Where("id = ? AND user_id = ?", id, userID).First(&transaction).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found or unauthorized"})
		return
	}

	if err := config.DB.Delete(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction deleted successfully"})
}
