import { PingPong } from './lib/engine';

let HOST = location.origin.replace(/^http/, 'ws')
let ws = new WebSocket(HOST);
let el;
let str;
let id = new Date().getTime();
let game;
let localData = {
  login: false,
  id: id,
  cursor: {
    x: 0,
    y: 0
  }
}


ws.onmessage = (event) => {
  // 取回整體遊戲當前狀況資料
  let dataFromServer = JSON.parse(event.data);

  if (dataFromServer.connected === true) {
    ws.send(JSON.stringify(localData));
    game = new PingPong();
    localData.login = true;
  }
  else {
    // 把當前遊戲狀況資料印出來
    str = '';
    el = document.getElementById('server-time');
    game.draw(dataFromServer);

    // 把當前玩家操作狀況送給server
    // 注意送出前都要先轉字串
    ws.send(JSON.stringify(localData));

  }

};

document.addEventListener('DOMContentLoaded', () => {

  document.body.addEventListener('mousemove', (event) => {
    localData.cursor.x = event.pageX;
    localData.cursor.y = event.pageY;
  })

})