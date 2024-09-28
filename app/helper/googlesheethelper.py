import gspread

def get_data_from_googlesheets():
    gc = gspread.service_account('/Users/shyamsundar/Projects/mindojo/islandwaterflow/app/utils/token.json')
    wks = gc.open("Full stack developer test cases")
    result = {}
    for worksheet in wks.worksheets():
        result[worksheet.title] = worksheet.get_all_values()
    return result
