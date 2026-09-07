import FooterNav from "../navbar/FooterNav"


export default function Footer() {

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-40 bg-black/90">
            <div className="w-full max-w-md px-page_margin py-3 rounded-t-xl">
                <FooterNav />
            </div>
        </div>
    )
}