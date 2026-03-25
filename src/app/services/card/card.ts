import { Injectable, signal, computed, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface CardProduct {
  uuid: string;
  slug: string;
  title: string;
  price: string;
  is_added: boolean;
  location: string;
  description: string;
  images: string;
}

@Injectable({
  providedIn: 'root',
})
export class Card {
  // ---------- Signals
  public myCard = signal<CardProduct[]>([]);
  public uuid = signal<string>('');

  // ---------- Computed signals
  isAdded(uuid: string) {
    const itemFound = this.myCard().find(ele => ele.uuid == uuid)
    return itemFound ? itemFound.is_added : false
  }
  public cardLength = computed(() => this.myCard().length);
  constructor(private route: ActivatedRoute) {
    // Load saved card from localStorage
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('myCard') || '[]');
      this.myCard.set(saved);
    }

    // Get uuid from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('uuid');
      if (id) this.uuid.set(id);
    });
  }

  // ---------- Add to card
  addToCard(data: CardProduct) {
    const newItem: CardProduct = {
      ...data,
      is_added: true,
    };
    this.myCard.update(items => {
      const updated = [...items, newItem];
      localStorage.setItem('myCard', JSON.stringify(updated));
      // this.cdr.detectChanges()
      return updated;
    });
  }

  // ---------- Remove from card
  removeFromCard(uuid: string) {
    this.myCard.update(items => {
      const updated = items.filter(item => item.uuid !== uuid);
      localStorage.setItem('myCard', JSON.stringify(updated));
      // this.cdr.detectChanges()
      return updated;
    });
  }

  // ---------- Get current item by UUID
  get currentItemFromCard() {
    return this.myCard().find(item => item.uuid === this.uuid());
  }
}