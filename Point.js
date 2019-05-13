class Point{
    constructor(x,y,fov,detail){
        this.x = x;
        this.y = y;
        this.fov = fov;
        this.detail = detail;
        this.ang = 0;
        this.rays = [];
        let ang = 0;
        for (let i = 0; i<detail; i++){
            this.rays.push(new Ray(this.x,this.y,Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),ang));
            ang += (fov/detail);
        }
    }
    move(s,fb){
        //absolute positioning
        // this.x += x;
        // this.y += y;
        // for (let ray of this.rays){
        //     ray.x += x;
        //     ray.y += y;
        // }

        //relative positioning
        let a = this.ang + this.fov/2;
        //forward and back
        let nx = fb * Math.cos(a*Math.PI/180);
        let ny = fb * Math.sin(a*Math.PI/180);
        //to the sides
        nx += s * Math.cos((a+90)*Math.PI/180);
        ny += s * Math.sin((a+90)*Math.PI/180);

        this.x += nx;
        this.y += ny;
        for (let ray of this.rays){
            ray.x += nx;
            ray.y += ny;
        }
    }
    turn(amount){
        this.ang += amount;
        for (let ray of this.rays){
            let ang = ray.ang;
            ang += amount;
            ray.dirx = Math.cos(ang * Math.PI / 180);
            ray.diry = Math.sin(ang * Math.PI / 180);
            ray.ang = ang;
        }
    }
}