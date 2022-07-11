import domtoimage from "dom-to-image-more";
import { jsPDF } from "jspdf";

// 1 - turn the dom into a image || uses https://github.com/1904labs/dom-to-image-more
// 2 - print that image || https://github.com/parallax/jsPDF

// V3 version
export default defineNuxtPlugin(() => {
  return {
    provide: {
      domToImage: (node) => {
        domtoimage
          .toPng(node)
          .then((dataUrl) => {
            let img = new Image();
            img.src = dataUrl;

            const doc = new jsPDF({
              orientation: "portrait",
              format: 'a4',
            });

            doc.setFontSize(40);
            doc.text("Rocky Bingo", 40, 40);
            doc.addImage(img, "PNG", 20, 50, 165, 165);

            const filename = "bingo.pdf";
            doc.save(filename);
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      },
    },
  };
});
