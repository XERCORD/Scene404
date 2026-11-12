import Equalizer from './Equalizer'

// Fond plein écran de la bannière d'accueil : le visuel principal du concert, ou un décor animé en attendant
export default function HeroBackdrop({ image, name }) {
  return (
    <div className="absolute inset-0">
      {image ? (
        <img
          src={image}
          alt={`Visuel du concert ${name}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Visuel du concert ${name}`}
          className="relative h-full w-full overflow-hidden"
        >
          <span className="absolute -left-40 top-0 h-[36rem] w-[36rem] animate-float rounded-full bg-accent/35 blur-[130px]" />
          <span className="absolute -right-32 top-1/4 h-[28rem] w-[28rem] animate-float rounded-full bg-artists/25 blur-[130px] [animation-delay:-6s]" />
          <span className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] animate-float rounded-full bg-contact/20 blur-[130px] [animation-delay:-11s]" />
          <Equalizer bars={40} className="absolute inset-x-0 bottom-0 h-3/5 px-5 opacity-35" />
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-bg via-bg/65 to-bg/25"
      />
    </div>
  )
}
