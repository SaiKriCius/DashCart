import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useState, useEffect } from "react";

const DEFAULT_MAX_QTY = 10;

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();

    // support per-product max, fallback to default
    const MAX_QTY = item.maxQuantity ?? DEFAULT_MAX_QTY;

    const [inputValue, setInputValue] = useState(String(item.quantity));
    const [showMaxWarning, setShowMaxWarning] = useState(false);

    // keep input synced if quantity changes elsewhere
    useEffect(() => {
        setInputValue(String(item.quantity));
    }, [item.quantity]);

    const commitQuantity = () => {
        let value = Number(inputValue);

        if (!value || value < 1) value = 1;
        if (value > MAX_QTY) {
            value = MAX_QTY;
            setShowMaxWarning(true);
        }

        updateQuantity(item._id, value);
        setInputValue(String(value));
    };

    const increaseQty = () => {
        if (item.quantity >= MAX_QTY) {
            setShowMaxWarning(true);
            return;
        }
        updateQuantity(item._id, item.quantity + 1);
    };

    const decreaseQty = () => {
        updateQuantity(item._id, Math.max(1, item.quantity - 1));
    };

    return (
        <div className="rounded-2xl border border-border-subtle bg-surface backdrop-blur-lg shadow-lg p-4 md:p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10 hover:bg-slate-900/80 group">
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">

                {/* IMAGE */}
                <div className="relative shrink-0 rounded-xl border border-border-subtle overflow-hidden bg-surface-hover">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 sm:h-28 sm:w-28 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold text-text-main line-clamp-2">
                                {item.name}
                            </h3>
                            <p className="mt-1 text-primary text-lg font-extrabold">
                                ₹{item.price}
                            </p>
                        </div>

                        {/* REMOVE BUTTON (Moved to top right for better layout) */}
                        <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 shrink-0"
                            title="Remove item"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        
                        {/* QUANTITY CONTROLS - Unified Pill Design */}
                        <div className="flex flex-col">
                            <div className="flex items-center bg-surface-hover border border-border-subtle rounded-lg w-max p-1">
                                <button
                                    onClick={decreaseQty}
                                    className="p-1.5 rounded-md text-slate-300 hover:bg-white/10 hover:text-text-main transition-colors disabled:opacity-50"
                                >
                                    <Minus size={16} />
                                </button>

                                <input
                                    type="number"
                                    min="1"
                                    max={MAX_QTY}
                                    inputMode="numeric"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        setShowMaxWarning(false);
                                    }}
                                    onBlur={commitQuantity}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.target.blur();
                                    }}
                                    className="
                                        w-12
                                        text-center
                                        bg-transparent
                                        border-none
                                        text-text-main
                                        font-semibold
                                        text-sm
                                        focus:outline-none focus:ring-0
                                        [appearance:textfield]
                                        [&::-webkit-inner-spin-button]:appearance-none
                                        [&::-webkit-outer-spin-button]:appearance-none
                                    "
                                />

                                <button
                                    onClick={increaseQty}
                                    disabled={item.quantity >= MAX_QTY}
                                    className={`p-1.5 rounded-md transition-colors ${
                                        item.quantity >= MAX_QTY
                                            ? "text-slate-500 cursor-not-allowed"
                                            : "text-slate-300 hover:bg-white/10 hover:text-text-main"
                                    }`}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            {/* MAX WARNING */}
                            {showMaxWarning && (
                                <p className="mt-1.5 text-xs font-medium text-yellow-400 animate-pulse">
                                    Limit reached ({MAX_QTY})
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;