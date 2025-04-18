import MobilePreview from "../_components/MobilePreview";
import ThemeOptions from "./_components/ThemeOptions";

export default function Styles() {
    return (
        <div className="">
            <div className="p-5">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                           <div className="col-span-2">
                               <ThemeOptions />
                           </div>
                           <div>
                               <MobilePreview />
                           </div>
                        </div>
            </div>
        </div>
    )
}