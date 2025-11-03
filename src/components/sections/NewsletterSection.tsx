import Newsletter from "../sections/NewsletterSection"


export default function NewsletterSection() {

    return (
        <section className="relative w-full mb-20">
            <figure className="z-0">
                <img src="src/assets/building.png" alt="" className="w-full" />
            </figure>

            <div className="absolute inset-0 bg-dinmaegler-blue/85 z-10"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 w-full">
                <div className="w-100">
                    <h3 className="h3 text-white text-center">Tilmeld dig vores nyhedsbrev og hold dig opdateret</h3>
                </div>

                <Newsletter />

            </div>
        </section>
    )
}