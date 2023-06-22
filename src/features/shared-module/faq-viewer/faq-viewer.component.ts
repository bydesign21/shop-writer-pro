import { Component } from '@angular/core';

@Component({
  selector: 'swp-faq-viewer',
  templateUrl: './faq-viewer.component.html',
  styleUrls: ['./faq-viewer.component.scss']
})
export class FaqViewerComponent {
  faqs = [
    {
      question: 'How do I submit a claim?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu.'
    },
    {
      question: 'How long does it take to get an estimate?',
      answer: 'Vivamus ac tellus eget lorem cursus vestibulum. Donec aliquet.'
    },
    {
      question: 'What information do I need to provide?',
      answer: 'Duis a risus eget tellus porta commodo. Suspendisse suscipit.'
    },
  ];
}
