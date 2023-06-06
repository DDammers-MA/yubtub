class App {
    data = [
        {
            id: 0,
            video: "video--1 (1).mp4",
            link: 1
    },
        {
            id: 1,
            video: "video--2 (2).mp4",
            link: 0
        }
]
    constructor() {
      
        this.switcher = new Switcher(this, this.data);

    }
}

class Switcher {
    Yubtub;
    Cleaner;
    app;
    default = 0;
    constructor(app, data) {
        this.app = app;
        this.data = data;
        this.yubtub = new Yubtub(app, this.data[this.default]);
        this.cleaner = new Cleaner();
     
    }

    switch(link) {
        this.cleaner.clean("body")
       this.yubtub = new Yubtub(app, this.data[link]);
    }

}

class Cleaner {

    clean(whatToClean) {
        document.querySelector(whatToClean).innerHTML = "";
    }
}

class Yubtub {
    aside;
    renderer;
    app;
    data
    constructor(app, data) {
       
        this.app = app;

        this.renderer = new Renderer();
        this.aside = new Aside(this, data);
        this.header = new Header();
        this.main = new Main(this);

       
    }
}

class Renderer {

    render(whereToRender, whatToRender) {
        document.querySelector(whereToRender).appendChild(whatToRender);
    }
}

class Aside {
    yubtub;
    nextvideo;
    htmlElement;
    constructor(yubtub, data) {
        
        this.yubtub = yubtub
        this.htmlElement = document.createElement("aside");
       
        this.yubtub.renderer.render("body", this.htmlElement);
        this.nextvideo = new NextVideo(this, data);
    }
}

class Header{
    constructor() {
        
    }
}

class Main{
    yubtub;
    constructor(yubtub) {
        this.yubtub = yubtub;
        
        this.comments = new Comments(this);
    }
}

class video{
    constructor() {
        
    }
}

class Comments{
    main
    constructor(main) {
        this.main = main;

        this.comment = new Comment(this)
    }
}

class Comment{
    comments
    constructor(comments) {
        this.comments = comments
        
    }
}

class NextVideo {
    aside;
    htmlElement
    constructor(aside, data) {

        console.log(data);
        this.data = data;
        this.aside = aside;
        this.htmlElement = document.createElement("video");
       
        this.htmlElement.src = "./video/" + data.video;
        this.aside.yubtub.renderer.render("aside", this.htmlElement);

        this.htmlElement.onclick = this.videoClicked;
    }

    videoClicked = () => {
        this.aside.yubtub.app.switcher.switch(this.data.link);
    }
}



const app = new App();
console.log(app);