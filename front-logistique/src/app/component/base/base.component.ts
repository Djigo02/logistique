import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    console.log('AMOURA INCUBES 2024');
    this.initializeSidebar();
  }

  initializeSidebar(): void {
    console.log('Initializing Sidebar');
    const elements = document.querySelectorAll('[data-bs-toggle="slide"]');
    elements.forEach((element) => {
      console.log('Element found:', element);
      this.renderer.listen(element, 'click', () => {
        console.log('Element clicked:', element);
        const parent = element.closest('.slide');
        if (parent) {
          console.log('Parent element:', parent);
          const expandedSlides = document.querySelectorAll(
            '.app-sidebar .slide.is-expanded'
          );
          expandedSlides.forEach((expandedSlide) => {
            if (expandedSlide !== parent) {
              expandedSlide.classList.remove('is-expanded');
            }
          });
          parent.classList.toggle('is-expanded');
          console.log('Parent class toggled');
        }
      });
    });
  }
}
