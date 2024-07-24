import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  items = [
    {
      logo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEXMAQDMAADNCQjLAADTMjLYX17VTk7bV1bVTU3TOzvbWlnYQ0LQJibKAADrpKP/+vrhfHzwtbX////jhIT0z8/olpXkiYn21tbvuLj98fHecXHHAAD32dnXSkrcXFvRFxbxwcHaaGfRISH66entqqrqn5/SLy/s5ssvAAAA/UlEQVR4Ac3SBYKEMBAEwOl0cGY5Zt0V/v/ES87dZRuJFJpEXg9cOGL5UhHw9XwPv/5O3ia2Y4nbihP6JEmzPEkKgiironQE6jItc4gOmovW2mHTKv1oXPjJNFfUM5svAo6K5cAGy2K19PPpklzObE3NbAqRYqMaUHWx3dlQRbi3lbIMSDk4XCGwtaYkhMXctnqNgFxh6LSmogjro21uUOQW/T1mt4hrBNBYQgirueHpnaInm4SCCxspbxF6CgjBdnqMvzKae2piKyAYqtFxVDkIXdtl6XjXE4fTcbWPyML3vggo0Gq9XpOCQxG7JGoM5PnAn98Cw6sJ6F7P9hLc/hC1BcMqjgAAAABJRU5ErkJggg==",
      name : "The Times Of India",
      tital : "News Article Title",
      desc : " News Article Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam minima repellendus id incidunt quidem autem modi cum earum corrupti sapiente quam suscipit corporis, itaque natus quas, magni dignissimos, expedita inventore.",
      newsImg : "https://m.media-amazon.com/images/S/pv-target-images/a0cb3885c44b8305ac89ba7ce98e8cd978bf3ebba6a151a00dbf2d528e98bf3b.jpg",
      time : "2 Hours Ago"
    },
    {
      logo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEXMAQDMAADNCQjLAADTMjLYX17VTk7bV1bVTU3TOzvbWlnYQ0LQJibKAADrpKP/+vrhfHzwtbX////jhIT0z8/olpXkiYn21tbvuLj98fHecXHHAAD32dnXSkrcXFvRFxbxwcHaaGfRISH66entqqrqn5/SLy/s5ssvAAAA/UlEQVR4Ac3SBYKEMBAEwOl0cGY5Zt0V/v/ES87dZRuJFJpEXg9cOGL5UhHw9XwPv/5O3ia2Y4nbihP6JEmzPEkKgiironQE6jItc4gOmovW2mHTKv1oXPjJNFfUM5svAo6K5cAGy2K19PPpklzObE3NbAqRYqMaUHWx3dlQRbi3lbIMSDk4XCGwtaYkhMXctnqNgFxh6LSmogjro21uUOQW/T1mt4hrBNBYQgirueHpnaInm4SCCxspbxF6CgjBdnqMvzKae2piKyAYqtFxVDkIXdtl6XjXE4fTcbWPyML3vggo0Gq9XpOCQxG7JGoM5PnAn98Cw6sJ6F7P9hLc/hC1BcMqjgAAAABJRU5ErkJggg==",
      name : "The Times Of India",
      tital : "News Article Title",
      desc : " News Article Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam minima repellendus id incidunt quidem autem modi cum earum corrupti sapiente quam suscipit corporis, itaque natus quas, magni dignissimos, expedita inventore.",
      newsImg : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
      time : "2 Hours Ago"
    },
    {
      logo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEXMAQDMAADNCQjLAADTMjLYX17VTk7bV1bVTU3TOzvbWlnYQ0LQJibKAADrpKP/+vrhfHzwtbX////jhIT0z8/olpXkiYn21tbvuLj98fHecXHHAAD32dnXSkrcXFvRFxbxwcHaaGfRISH66entqqrqn5/SLy/s5ssvAAAA/UlEQVR4Ac3SBYKEMBAEwOl0cGY5Zt0V/v/ES87dZRuJFJpEXg9cOGL5UhHw9XwPv/5O3ia2Y4nbihP6JEmzPEkKgiironQE6jItc4gOmovW2mHTKv1oXPjJNFfUM5svAo6K5cAGy2K19PPpklzObE3NbAqRYqMaUHWx3dlQRbi3lbIMSDk4XCGwtaYkhMXctnqNgFxh6LSmogjro21uUOQW/T1mt4hrBNBYQgirueHpnaInm4SCCxspbxF6CgjBdnqMvzKae2piKyAYqtFxVDkIXdtl6XjXE4fTcbWPyML3vggo0Gq9XpOCQxG7JGoM5PnAn98Cw6sJ6F7P9hLc/hC1BcMqjgAAAABJRU5ErkJggg==",
      name : "The Times Of India",
      tital : "News Article Title",
      desc : " News Article Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam minima repellendus id incidunt quidem autem modi cum earum corrupti sapiente quam suscipit corporis, itaque natus quas, magni dignissimos, expedita inventore.",
      newsImg : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
      time : "2 Hours Ago"
    },
    {
      logo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEXMAQDMAADNCQjLAADTMjLYX17VTk7bV1bVTU3TOzvbWlnYQ0LQJibKAADrpKP/+vrhfHzwtbX////jhIT0z8/olpXkiYn21tbvuLj98fHecXHHAAD32dnXSkrcXFvRFxbxwcHaaGfRISH66entqqrqn5/SLy/s5ssvAAAA/UlEQVR4Ac3SBYKEMBAEwOl0cGY5Zt0V/v/ES87dZRuJFJpEXg9cOGL5UhHw9XwPv/5O3ia2Y4nbihP6JEmzPEkKgiironQE6jItc4gOmovW2mHTKv1oXPjJNFfUM5svAo6K5cAGy2K19PPpklzObE3NbAqRYqMaUHWx3dlQRbi3lbIMSDk4XCGwtaYkhMXctnqNgFxh6LSmogjro21uUOQW/T1mt4hrBNBYQgirueHpnaInm4SCCxspbxF6CgjBdnqMvzKae2piKyAYqtFxVDkIXdtl6XjXE4fTcbWPyML3vggo0Gq9XpOCQxG7JGoM5PnAn98Cw6sJ6F7P9hLc/hC1BcMqjgAAAABJRU5ErkJggg==",
      name : "The Times Of India",
      tital : "News Article Title",
      desc : " News Article Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam minima repellendus id incidunt quidem autem modi cum earum corrupti sapiente quam suscipit corporis, itaque natus quas, magni dignissimos, expedita inventore.",
      newsImg : "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg?format=1500w",
      time : "2 Hours Ago"
    },
  ]
}
