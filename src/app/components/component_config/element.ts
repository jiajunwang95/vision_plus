export const imageSize = {
    MOBILE: '12',
    DEFAULT: '24'
}
export const tabs = [
    {
        name: 'Log Check',
        icon: 'money-collect',
        route : 'log',
        disabled : false
      },
      {
        name: 'Data Check',
        icon: 'control',
        route : 'data',
        disabled : false
      },
]
export const filter_config = {
    ADMIN : [
      {
        HEADING : 'COUNTRY',
        ICON : 'compass',
        DATA : [
          {LABEL : "SG", VALUE : "SINGAPORE"},
          {LABEL : "MY", VALUE : "MALAYSIA"},
          {LABEL : "CN", VALUE : "CHINA"}
        ],
      },
      {
        HEADING : 'MONTH',
        ICON : 'calendar',
        DATA :[
          {LABEL : "JAN", VALUE : "JAN"},
          {LABEL : "FEB", VALUE : "FEB"},
          {LABEL : "MAR", VALUE : "MAR"}
        ]
      }
    ]
}