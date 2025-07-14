import cardStyles from '../Header.module.css';

const infos = [
  {
    title: 'À propos',
    text: "Découvrez le parcours, l\u2019univers et la d\u00e9marche artistique de l\u2019auteur du site.\nCette section pr\u00e9sente les intentions, inspirations et rep\u00e8res biographiques essentiels."
  },
  {
    title: 'Feuille de route',
    text: "Retrouvez les grandes \u00e9tapes du projet, ses \u00e9volutions pass\u00e9es et les directions \u00e0 venir.\nVous pourrez suivre ici le d\u00e9veloppement artistique, les objectifs et les jalons importants."
  },
  {
    title: 'Participer \u00e0 un projet',
    text: "D\u00e9couvrez comment vous pouvez vous impliquer dans les cr\u00e9ations en cours ou \u00e0 venir.\nPropositions de collaboration, appels \u00e0 contribution ou projets participatifs sont expliqu\u00e9s ici."
  },
  {
    title: 'R\u00e9seaux',
    text: "Acc\u00e9dez aux liens vers les plateformes sociales et artistiques o\u00f9 l\u2019artiste partage ses actualit\u00e9s.\nRejoignez la communaut\u00e9 et suivez l\u2019avancement des projets sur diff\u00e9rents r\u00e9seaux."
  },
  {
    title: 'Partenariat',
    text: "Espace d\u00e9di\u00e9 aux collaborations avec institutions, entreprises ou autres artistes.\nRetrouvez ici les opportunit\u00e9s de partenariat et les projets men\u00e9s en commun."
  },
  {
    title: 'Contact',
    text: "Pour toute demande, question ou prise de contact, utilisez les informations et formulaires pr\u00e9sents ici.\nN\u2019h\u00e9sitez pas \u00e0 \u00e9crire pour en savoir plus, proposer un projet ou solliciter un \u00e9change."
  },
    {
    title: 'Glossaire',
    text: "Pour toute demande, question ou prise de contact, utilisez les informations et formulaires pr\u00e9sents ici.\nN\u2019h\u00e9sitez pas \u00e0 \u00e9crire pour en savoir plus, proposer un projet ou solliciter un \u00e9change."
  }
];

const InfoGrid = () => (
  <div className="grid grid-cols-1 gap-8 w-full md:grid-cols-2 lg:grid-cols-3">
    {infos.map((info, idx) => (
      <div
        key={idx}
        className={`${cardStyles.card} ${cardStyles.tab6Card} flex flex-col`}
      >
        <h3 className="font-heading text-xl mb-2 text-white sm:text-lg">
          {info.title}
        </h3>
        <p className="font-base text-base leading-6 text-white m-0">
          {info.text}
        </p>
      </div>
    ))}
  </div>
);

export default InfoGrid;
