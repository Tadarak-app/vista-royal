import { useEffect, useRef } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cartEnquiryLink, formatPkr } from "@/lib/storefront";

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { lines, itemCount, subtotalPkr, setQuantity, removeItem } = useCart();
  const dialogRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const focusIsInside = dialog.contains(document.activeElement);
      if (!focusIsInside) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="cart-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onCloseRef.current(); }}>
      <aside ref={dialogRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabIndex={-1}>
        <div className="cart-drawer-header">
          <div><p className="eyebrow">YOUR SELECTION</p><h2 id="cart-title">Shopping bag <span>({itemCount})</span></h2></div>
          <button ref={closeButtonRef} className="icon-button" type="button" aria-label="Close cart" onClick={() => onCloseRef.current()}><X size={21} /></button>
        </div>
        {lines.length ? (
          <>
            <div className="cart-items">
              {lines.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <img src={product.image} alt={product.imageAlt} />
                  <div className="cart-item-info">
                    <p className="eyebrow">{product.collection}</p>
                    <h3>{product.title}</h3>
                    <strong>{formatPkr(product.pricePkr)}</strong>
                    <div className="quantity-row">
                      <div className="quantity-stepper" aria-label={`Quantity for ${product.title}`}>
                        <button type="button" aria-label="Reduce quantity" onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={14} /></button>
                        <span>{quantity}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={14} /></button>
                      </div>
                      <button className="remove-item" type="button" onClick={() => removeItem(product.id)}><Trash2 size={14} /> Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPkr(subtotalPkr)}</strong></div>
              <p>Delivery and availability will be confirmed by Vista Royal on WhatsApp.</p>
              <a className="button button-primary button-block" href={cartEnquiryLink(lines)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
              <small>This opens an enquiry; it does not place or confirm an order.</small>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <div className="empty-bag-icon"><span>VR</span></div>
            <h3>Your bag is waiting</h3>
            <p>Products will appear here once Vista Royal's verified catalogue is added.</p>
            <a className="button button-primary button-block" href={cartEnquiryLink([])} target="_blank" rel="noreferrer">Ask for the current collection</a>
            <button className="button button-quiet button-block" type="button" onClick={() => onCloseRef.current()}>Continue browsing</button>
          </div>
        )}
      </aside>
    </div>
  );
}
