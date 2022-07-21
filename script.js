let currentRoom = [];
let rooms = [];
let pointId = 0;

const map = document.getElementById("map");
const mapImg = document.querySelector('img');



map.addEventListener('click', (e) => {
    const container = mapImg.getBoundingClientRect();
    let x = ((e.offsetX) / container.width) * 100;
    let y = ((e.offsetY)/ container.height) * 100;
    x = `${x}%`;
    y = `${y}%`;
    console.log(container.height, container.width);

    currentRoom.push({ x, y, id: pointId });
    const point = document.createElement('div');
    point.id = pointId++;
    point.style.top = y;
    point.style.left = x;
    point.classList.add('point');

    console.log(currentRoom);
    map.appendChild(point);
});


function createRoom(){
    const room = document.createElement('div');
    room.classList.add('room');
    room.classList.add('custom');
    room.style.clipPath = `polygon(${currentRoom.map((point, index) => {
        let str = `${point.x} ${point.y}`;
        if (index === currentRoom.length - 1) {
        str += ')';
    }
    return str;
  })}`;

    room.addEventListener('click', (e) => {
        e.cancelBubble = true;
        console.log('room clicked');
  });

    currentRoom.forEach((point) => {
        const p = document.getElementById(point.id);
        map.removeChild(p);
  });

    currentRoom = [];
    rooms.push(room);
    map.appendChild(room);

};

function clearCreatedRooms(){
    rooms.forEach((room) => {
        map.removeChild(room);
    })
    rooms = [];
}

function clearPoints(){
    currentRoom.forEach((point) => {
        const p = document.getElementById(point.id);
        map.removeChild(p);
  });
    currentRoom = [];
}
