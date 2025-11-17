import { type BtnFlipProps } from "../../Types";

export default function BtnFlip({ activeCategory, onCategoryChange }: BtnFlipProps) {
   

    return (
        <div className="flex gap-2 bg-primary_2 rounded p-2 w-full h-14 mb-4">
            <button
                onClick={() => onCategoryChange('nowShowing')}
                className={`px-4 py-2 rounded transition-colors w-full h-10 ${
                    activeCategory === 'nowShowing'
                        ? 'bg-blue-400 text-white'
                        : 'bg-transparent text-gray-400'
                }`}
            >
                Now Showing
            </button>
            <button
                onClick={() => onCategoryChange('upcoming')}
                className={`px-4 py-2 rounded transition-colors w-full h-10 ${
                    activeCategory === 'upcoming'
                        ? 'bg-blue-400 text-white'
                        : 'bg-transparent text-gray-400'
                }`}
            >
                Upcoming
            </button>
        </div>
    )
}