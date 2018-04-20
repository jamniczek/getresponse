function chooseCampaign(campaignIdArg) {
    switch (campaignIdArg) {
        case 'de_DE':
            return  '6GZdu'
            break;
        case 'fr_FR': 
        case 'fr_CA':
            return  '6GZsp'
            break;
         case 'pl_PL':
            return  '6GZEt'
            break;
        case 'it_IT':
        case 'sc_IT':
            return  '6Giph'
            break;
        case 'es_LA':
        case 'es_ES':
            return  '6GiTG'
            break;
         case 'pt_BR':
         case 'pt_PT':
            return  '6Gi66'
            break;
        case 'tr_TR':
            return  '6GiaD'
            break;
        default:
            return '6ufeU'
    }
}

module.exports = {
    chooseCampaign,
}