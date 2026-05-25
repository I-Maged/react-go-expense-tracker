package models

import "time"

type Transaction struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	Type      string    `gorm:"not null" json:"type"`
	Amount    float64   `gorm:"not null" json:"amount"`
	Category  string    `gorm:"not null" json:"category"`
	Date      time.Time `gorm:"not null" json:"date"`
	Note      string    `json:"note"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
