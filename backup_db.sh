#!/bin/bash

# 1. กำหนดชื่อไฟล์ตามวันที่และเวลา
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/juiceshop_db_$TIMESTAMP.sqlite"

# 2. สร้างโฟลเดอร์ backups ถ้ายังไม่มี
mkdir -p $BACKUP_DIR

echo "📦 กำลังเริ่มสำรองข้อมูลฐานข้อมูล..."

# 3. ก๊อปปี้ไฟล์ฐานข้อมูลออกมาจาก Docker Container
# (Juice Shop ใช้ SQLite เก็บไว้ที่ /juice-shop/data/juiceshop.sqlite)
docker cp $(docker compose ps -q web-shop):/juice-shop/data/juiceshop.sqlite $BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "✅ สำรองข้อมูลสำเร็จ: $BACKUP_FILE"
else
  echo "❌ เกิดข้อผิดพลาดในการสำรองข้อมูล"
  exit 1
fi
