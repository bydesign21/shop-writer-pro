import { Component } from '@angular/core';

@Component({
  selector: 'swp-faq-viewer',
  templateUrl: './faq-viewer.component.html',
  styleUrls: ['./faq-viewer.component.scss']
})
export class FaqViewerComponent {
  faqs = [
    {
        'question': 'What is Shop Writer Pro\'s purpose?',
        'answer': 'Shop Writer Pro is designed to empower Body Shops, making their estimating process as easy and beneficial for them as possible. We do this by meticulously calculating the cost of accident-related damage and the procedures required to repair the damaged vehicle.'
    },
    {
        'question': 'How can I utilize Shop Writer Pro?',
        'answer': 'Using Shop Writer Pro is easy. Just provide us with the vehicle\'s VIN number, some photos showing the damage, and a short explanation of the accident, particularly if there are any damages that may not be visible in the photos.'
    },
    {
        'question': 'Can you explain Shop Writer Pro\'s estimation process?',
        'answer': 'Absolutely! After you submit the necessary information and photos, our expert team reviews them and drafts an initial estimate. This estimate then undergoes a second round of review to ensure precision and accuracy before being sent back to you.'
    },
    {
        'question': 'How reliable is the estimate I get from Shop Writer Pro?',
        'answer': 'We take pride in the accuracy of our estimates. Our team focuses on securing the maximum benefit for your body shop. We account for every damaged part, body panel, and required OEM repair process to ensure a comprehensive, beneficial estimate.'
    },
    {
        'question': 'How quickly can I receive my estimate from Shop Writer Pro?',
        'answer': 'We\'re all about efficiency. 80% of our estimates are completed and returned to you within just one hour! Our extensive team of estimators works tirelessly around the clock to serve you. Once ready, your estimate will be sent directly to your email, prepped and ready for negotiations with insurance companies.'
    },
]

}
