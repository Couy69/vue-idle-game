# rpg(暂时没想好名字)

> 一个全随机的刷词条小游戏

### 安装依赖
```sh
  npm install
```

### 启动项目
```sh
  npm run serve
```

### 打包项目
```sh
  npm run build
```

### 游戏设计
```sh
  每秒回血
  dps与战斗力
  词条  加回血速度  格挡 攻击速度每秒一次 战斗以秒为单位
```

### 伤害计算公式
##### 方式1
```sh
var armor=40;
console.log(1 - 0.06 * armor / (1 / (0.06 * armor)))
```
##### 方式2
```sh
// 伤害=（攻击×参数1+参数2）/（攻击+防御×参数3+参数4）
var def=40,atk=200
var dmg = (atk*1+1)/(atk+dek*1+1)
console.log(dmg)
```