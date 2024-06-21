FROM node:18-alpine

# 創建應用目錄
WORKDIR /src


COPY package.json ./
COPY tsconfig.json ./
COPY src ./

# 
RUN yarn && yarn install && yarn build

# COPY node_modules ./
COPY . .

RUN cd dist

# 啟動應用
CMD ["node", "app.js"]