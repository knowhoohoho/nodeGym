<template>
    <div>f12를 눌러 console 탭과 network 탭을 확인하세요.</div>
</template>



<script>
export default {
    soket() {
        const webSocket = new WebSocket('ws://localhost:4000')
        webSocket.onopen = function () {
            console.log('서버와 웹소켓 연결 성공')
        };
        webSocket.onmessage = function (event) {
            console.log(event.data);
            webSocket.send('클라이언트에서 서버로 답장을 보냅니다.')
        }

    }
    
}
</script>