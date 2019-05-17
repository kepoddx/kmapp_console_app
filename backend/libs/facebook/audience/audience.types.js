export const AudienceTypes = {
    PWCEX: {
        audienceName: 'AG Paywall Converters Exclusions',
        subtype: "CUSTOM",
        id: null,
        customer_file_source: "USER_PROVIDED_ONLY",
        fileName: "",
        audiences: {
            include: ['Paywall Converters'],
            exclude: ['Active_FA', 'Active_DO']
        },
        budget: "",
        schedule: {
            from: {
                time: '',
                hours: ''
            },
            to: {
                time: '',
                hours: ''
            }
        },
        age: {
            from: '',
            to: ''
        },
        placements: {
            facebook: ['Feeds'],
            instagram: [],
            audienceNetwork: []
        },
        blockList: ['USATN FB Ad Exclusions_2.9.18'],
        optimization: 'Landing Page Views',
        objective: "LINK_CLICKS",
        headline: "Keep reading and support local journalism.",
        text: "Staying connected, informed, and involved in the community is a purpose, a passion, and a big part of why we’d like you to support local journalism.  Click Learn More below to unlock exclusive and unlimited access to fdlreporter.com.",
        websiteUrl: "",
        description: "Exclude from Paywall conveter ads",
        conversionTracking: "Facebook Pixel",
        imageLink: "assets/facebook/Paywall Converter.png"
     }
}

