class Ray{
    constructor(x,y,dirx,diry,ang){
        this.x = x;
        this.y = y;
        this.dirx = dirx;
        this.diry = diry;
        this.ang = ang;
    }
    cast(wall){
        let x1 = wall.x1;
        let y1 = wall.y1;
        let x2 = wall.x2;
        let y2 = wall.y2;

        let x3 = this.x;
        let y3 = this.y;
        let x4 = this.x + this.dirx;
        let y4 = this.y + this.diry;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
        return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t>0 && t<1 && u>0){
            let pt = {x:0,y:0};
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return false;
        }
    }

    look(walls){
        let closest = Infinity;
        let cpt = null;
        for (let wall of walls){
            let pt = this.cast(wall);
            if (!pt){
                continue;
            }
            let dist = this.dist(pt);
            if (dist<closest){
                closest = dist;
                cpt = pt;
            }
        }
        return cpt;
    }

    dist(pt){
        let xdiff = this.x - pt.x;
        let ydiff = this.y - pt.y;
        let dist = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
        return dist;
    }

}