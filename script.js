<!DOCTYPE html>
<html>

<body>
<canvas id = "ca" width = 400 height = 400></canvas>
<p id = "p"></p>
</body>
<script>
var p = document.getElementById("p");
var ctx = document.getElementById("ca").getContext("2d");
function vec(x,y,z){
	this.x=x;
	this.y=y;
	this.z=z;
	this.add = function(v){
		this.x+=v.x;
		this.y+=v.y;
		this.z+=v.z;
	}
	this.set = function(x,y,z){
		this.x=x;
		this.y=y;
		this.z=z;
	}
}
function dist(){
	var len = arguments.length/2;
	var out = 0;
	for(var i = 0; i<len; i++){
		out+=(arguments[i+len]-arguments[i])**2;
	}
	return out**0.5;
}
function map(n,or1,or2,r1,r2){return r1+(r2-r1)*((n-or1)/(or2-or1));}
function obj(x,y,z,m){
	this.pos = new vec(x,y,z);
	this.vel = new vec(0,0,0);
	this.acc = new vec(0,0,0);
	this.m = m;
	this.move = function(o){
		var distance = dist(o.pos.x,o.pos.y,o.pos.z,this.pos.x,this.pos.y,this.pos.z)
		var f = 6.67e-2*this.m*o.m/distance**2;
        var angh = Math.atan2(o.pos.z-this.pos.z,o.pos.x-this.pos.x);
		var angv = Math.acos((o.pos.y-this.pos.y)/distance);
		var ax = Math.cos(angh)*f/this.m;
		var ay = Math.cos(angv)*f/this.m;
		var az = Math.sin(angh)*f/this.m;
		this.acc.set(ax,ay,az);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	};
}
var n = 400;
var grid = [];
for(var i = 0; i<n; i++){
	grid.push([]);
	for(var j = 0; j<n; j++){
		grid[i].push(0);
	}
}
var rays = [];
for(var i = 0; i<n**2; i++){
	rays.push(new obj(0,200,200,1));
	rays[i].vel.set(((i%n)-Math.floor(n/2))/500,-1,(~~(i/n)-(~~(n/2)))/500)
	//(((i%n)-Math.floor(n/2))/500,-1,(~~(i/n)-(~~(n/2)))/500)
	//(((i%n)-Math.floor(n/2))/100,(~~(i/n)-(~~(n/2)))/100,1);
}
var hole = new obj(0,0,200,800);
var time = 0;
var maxTime = 300;
function loop(){
/*
ctx.fillStyle = "black";
ctx.fillRect(hole.pos.x-1.5,hole.pos.z-1.5,3,3);
*/
	p.innerHTML = `${(time/maxTime*100).toFixed(2)}%`;
	if(time<maxTime && rays.length>0){
		requestAnimationFrame(loop);
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,400,400);
	for(var i = 0; i<rays.length; i++){
		//rays[i].move(hole);
		var d = dist(rays[i].pos.x,rays[i].pos.z,hole.pos.x,hole.pos.z)
		if(rays[i].pos.x<-200 || rays[i].pos.x>200 || rays[i].pos.y<-200 || rays[i].pos.y>200 || rays[i].pos.z>400){
			//rays.splice(i,1);
		}else if((rays[i].pos.y>=hole.pos.y-2 && rays[i].pos.y<=hole.pos.y+2) && d<=80 && d>79){
			var x = i%n;
			var y = ~~(i/n);
			grid[y][x]=1;
			//rays.splice(i,1)
		}else{
			rays[i].move(hole);
			ctx.fillStyle = "black";
			ctx.fillRect(rays[i].pos.z,rays[i].pos.x+200,1,1);
		}
	}
	time++;
	}else{
		var size = 400/grid.length;
		for(var i = 0; i<grid.length; i++){
			for(var j = 0; j<grid[i].length; j++){
				ctx.fillStyle = `rgb(${grid[i][j]*255},0,0)`;
				ctx.fillRect(j*size,i*size,size,size)
			}
		}
	}

}
loop();
</script>
</html>
