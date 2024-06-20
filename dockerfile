FROM node:18-alpine

# 創建應用目錄
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn 

# 複製應用源代碼
COPY . .

# 暴露應用運行的端口
EXPOSE 3000

# 啟動應用
CMD ["node", "app.ts"]