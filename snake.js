class Snake{
  constructor(){
    this.body = []
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0
  }

  setDir(x, y){
    this.xdir = x;
    this.ydir = y;
  }

  move(){
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);

    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;

    if(x>w-1){
      this.body[this.body.length-1].x = 0;
    }

    if(x<0){
      this.body[this.body.length-1].x = w-1;
    }

    if(y>h-1){
      this.body[this.body.length-1].y = 0;
    }

    if(y<0){
      this.body[this.body.length-1].y = h-1;
    }
  }

  grow(){
    let head = this.body[this.body.length-1].copy();
    this.len++;
    this.body.push(head);
  }

  death(){
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    
    for(let i=0; i<this.body.length-1; i++){
      let part = this.body[i];
      if(part.x == x && part.y == y){
        return true;
      }
    }
    return false;
  }

  eat(pos){
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;

    if(x == pos.x && y == pos.y){
      this.grow();
      return true;
    }
    return false;
  }

  render(){
    for(let i=0; i<this.body.length; i++){
      fill(255);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }

}