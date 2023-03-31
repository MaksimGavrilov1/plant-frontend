import Image1 from "../images/1.jpg"
import Image2 from "../images/2.jpg"
import Image3 from "../images/3.jpg"
import Image4 from "../images/4.jpg"
import Image5 from "../images/5.jpg"
import Image6 from "../images/6.jpg"
import Image7 from "../images/7.jpg"
import Image8 from "../images/8.jpg"
import Image9 from "../images/9.jpg"

export default function RandomImage() {

    let imgArray = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9]
    let temp = Math.floor(Math.random() * (8 - 0 + 1) + 0)
    return imgArray[temp]
}