
class App {
  constructor() {
    this.api = new Api("./data/data.json");
    this.api.getData().then((data) => {
      this.switcher = new Switcher(this, data);
    });
  }
}

class Api {
  url = "";
  data = [];
  constructor(Newurl) {
    this.url = Newurl;
  }
  async getData() {
    await fetch(this.url)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        this.data = data.data;
      });
    return this.data;
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
    this.cleaner.clean("body");
 
    this.yubtub = new Yubtub(this.app, this.data[link]);
    
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
  data;
  constructor(app, data) {
    this.app = app;
    this.data = data;
    this.renderer = new Renderer();
    this.header = new Header()
    this.renderer.render("body", this.header.htmlElement);
    this.main = new Main(this, data);
    this.renderer.render("body", this.main.htmlElement); // Render Main component

    this.aside = new Aside(this, data);
    

  }
}

class Renderer {
  render(whereToRender, whatToRender) {
    document.querySelector(whereToRender).appendChild(whatToRender);
  }
}


class Main {
  yubtub;
  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.data = data;
    this.htmlElement = document.createElement("main");
    this.htmlElement.classList.add("body");
    this.articleElement = document.createElement("article");
    this.articleElement.classList.add("body__leftSide");

    
    this.videoContainerElement = document.createElement("div");
    this.videoContainerElement.classList.add("video-container");


    this.mainUlElement = document.createElement("ul");
    this.mainUlElement.classList.add("body__videoOverlay");

    this.separeteDivElement1 = document.createElement("div");
    this.separeteDivElement1.classList.add("body__div", "body__div--1");

    this.circleItem = document.createElement("li");
    this.circleItem.classList.add("body__VideoItems", "body__VideoItems--circle");
    this.separeteDivElement1.appendChild(this.circleItem); // Update variable name
    this.nameItem = document.createElement("li");
    this.nameItem.classList.add("body__VideoItems");
    this.nameItem.textContent = "Daniel";

    this.separeteDivElement2 = document.createElement("div");
    this.separeteDivElement2.classList.add("body__div", "body__div--2");

    this.starItem = document.createElement("li");
    this.starItem.classList.add("body__VideoItems");
    this.starIcon = document.createElement("i");
    this.starIcon.classList.add("fa-regular", "fa-star", "fa-2xl");

    this.rightArrowItem = document.createElement("li");
    this.rightArrowItem.classList.add("body__VideoItems");
    this.rightArrowIcon = document.createElement("i");
    this.rightArrowIcon.classList.add("fa-solid", "fa-right-long", "fa-2xl");




    this.htmlElement.appendChild(this.articleElement);
    this.articleElement.appendChild(this.videoContainerElement);
    this.videoContainerElement.appendChild(this.mainUlElement);
    this.mainUlElement.appendChild(this.separeteDivElement1)
    this.separeteDivElement1.appendChild(this.circleItem);
    this.separeteDivElement1.appendChild(this.nameItem);
    this.mainUlElement.appendChild(this.separeteDivElement2)
    this.separeteDivElement2.appendChild(this.starItem);
    this.starItem.appendChild(this.starIcon);
    this.separeteDivElement2.appendChild(this.rightArrowItem);
    this.rightArrowItem.appendChild(this.rightArrowIcon);



    this.comments = new Comments(this);
    this.video = new Video(data);
    this.videoContainerElement.appendChild(this.video.htmlElement);
    this.articleElement.appendChild(this.comments.htmlElement);

    this.yubtub.renderer.render("body", this.htmlElement);
  }
}


class Aside {
  yubtub;
  nextvideo;
  htmlElement;
  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.data = data;
    this.htmlElement = document.createElement("aside");
    this.htmlElement.classList.add("body__righSide");

    this.asideUlElement = document.createElement("ul");
    this.asideUlElement.classList.add("body__rightSidelist");

    this.asideItemElement = document.createElement("li")
    this.asideItemElement.classList.add("body__rightSideItems");

    this.htmlElement.appendChild(this.asideUlElement)
    this.asideUlElement.appendChild(this.asideItemElement);

   

    this.yubtub.renderer.render("main", this.htmlElement);
    this.nextvideo = new NextVideo(this, this.data);

    this.asideItemElement.appendChild(this.nextvideo.htmlElement);
  


  }
}

class Header {
  htmlElement;
  constructor() {
    this.htmlElement = document.createElement("header");
    this.htmlElement.classList.add("header");
  }
}



class Video {
  constructor(data) {
    this.data = data;
    this.htmlElement = document.createElement("video");
    this.htmlElement.classList.add("body__videoMain");
    this.htmlElement.src = "./video/" + data["video"];
    this.htmlElement.controls = true;

    
  }
}

class Comments {
  main;
  constructor(main) {
    this.main = main;
    this.htmlElement = document.createElement("section");
    this.htmlElement.classList.add("comments");
    this.commentsList = document.createElement("ul");
    this.commentsList.classList.add("comments__list");
    this.htmlElement.appendChild(this.commentsList);

    this.textArea = document.createElement("textarea");
    this.textArea.classList.add("comments__textArea");
    this.textArea.placeholder = "Plaats hier je reactie";
    this.textArea.addEventListener("keydown", this.handleKeyDown); 
    this.htmlElement.appendChild(this.textArea);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {

      event.preventDefault();
      this.commentText = this.textArea.value;
      this.textArea.value = ""; 

      this.comment = new Comment(this, this.commentText);
      this.commentsList.appendChild(this.comment.htmlElement);
    }
  };
}

class Comment {
  comments;
  constructor(comments, text) {
    this.comments = comments;
    this.htmlElement = document.createElement("li");
    this.htmlElement.classList.add("comments__list--item");
    this.commentDiv = document.createElement("div");
    this.commentDiv.classList.add("comments__div");

    this.profilePicture = document.createElement("img");
    this.profilePicture.classList.add("body__VideoItems--circle");
    this.profilePicture.src = "https://picsum.photos/81";
    this.profilePicture.alt = "Profile picture";
    this.commentDiv.appendChild(this.profilePicture);

    this.username = document.createElement("h4");
    this.username.textContent = "daniel";
    this.commentDiv.appendChild(this.username);

    this.htmlElement.appendChild(this.commentDiv);

    this.commentText = document.createElement("p");
    this.commentText.textContent = text; 
    this.htmlElement.appendChild(this.commentText);
  }
}


class NextVideo {
  aside;
  htmlElement;
  data;
  constructor(aside, data) {
    this.data = data;
    this.aside = aside;
    this.htmlElement = document.createElement("video");
    this.htmlElement.classList.add("body__RightSideVido");

    this.htmlElement.src = "./video/" + this.data["video"];


    this.htmlElement.onclick = this.videoClicked;
    
    this.aside.yubtub.renderer.render("aside", this.htmlElement);
  }

  videoClicked = () => {
    this.aside.yubtub.app.switcher.switch(this.data.link);
  };
}


const app = new App();
console.log(app);
