const schema = {
  type: "Root",
  children: [
    { type: "TitleSection",  },
    {
      type: "DescriptionSection",
      condition: props => !!props.isDescriptionDisplayed,
      props: {
        hotelData: { type: "Object" },
      },
    },
    {
      type: "AboutSection",
      children: [
        {
          type: "FavoritesSection",
          props: {
            hotelData: { type: "Object" },
          },
        },
      ],
    },
  ],
};

export default schema;
