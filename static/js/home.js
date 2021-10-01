const app = Vue.createApp({
  data() {
    return {
      img: "default",
      navbarUp: false,
      typer: "",
      numer: 0,
      typings: ["10 languages", "5 types of software"],
      del: false,
    };
  },
  mounted() {
    window.onscroll = () => {
      console.log(document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 600) {
        this.navbarUp = true;
      } else {
        this.navbarUp = false;
      }
    };
    window.setInterval(() => {
      if (this.img === "default") {
        this.img = "secondary";
      } else {
        this.img = "default";
      }
    }, 3000);
    window.setInterval(() => {
      if (this.typer === "") {
        this.del = false;
        this.typer += this.typings[this.numer][0];
      } else {
        if (this.del === true) {
          console.log("caught delete");
          let typingArray = this.typer.split("");
          typingArray.pop();
          console.log(typingArray);
          this.typer = typingArray.join("");
        } else {
          if (this.typer.length === this.typings[this.numer].length) {
            console.log("caught finished");
            this.del = true;
            this.numer === 0 ? (this.numer = 1) : (this.numer = 0);
          } else {
            this.typer += this.typings[this.numer][this.typer.length];
          }
        }
      }
    }, 300);
  },
});
app.mount("#home");
