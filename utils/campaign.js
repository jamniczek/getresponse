function chooseCampaign(campaignIdArg) {
    switch (campaignIdArg) {
        case 'de_DE':
            text =  '6GZdu'
            break;
        case 'fr_FR': 
        case 'fr_CA':
            text =  '6GZsp'
            break;
         case 'pl_PL':
            text =  '6GZEt'
            break;
        case 'it_IT':
        case 'sc_IT':
            text =  '6Giph'
            break;
        case 'es_LA':
        case 'es_ES':
            text =  '6GiTG'
            break;
         case 'pt_BR':
         case 'pt_PT':
            text =  '6Gi66'
            break;
        case 'tr_TR':
            text =  '6GiaD'
            break;
        default:
            text = '6ufeU'
    }
    return text;
}

console.log(chooseCampaign('it_IT'));

module.exports = {
    chooseCampaign,
}