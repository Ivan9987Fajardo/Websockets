import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection(){


    }

    async handleDisconnect(){


    }

    @SubscribeMessage('chat')
    async onChat(client, data){
        client.to(data.room.roomId).emit('chat', data);
    }

    @SubscribeMessage('join')
    async createRoom(client, room){
        console.log(room);
        
        client.join(room.roomId);
        if(room.type == 'user'){
            const alert = {
                type: 'message',
                data: room.userId + " has joined the room."
            }
            client.to(room.roomId).emit('alert',alert)
        }
        
    }
    


    

}