from __future__ import print_function

import sys, csv
from datetime import date
import json

import xlrd

def to_float(s):
    if not s:
        return 0.0

    if isinstance(s, (int, float)):
        return float(s)

    if isinstance(s, basestring):
        s = s.replace(',', '')
        s = s.replace(' ', '')
        return float(s)

    raise ValueError("can't handle value: '%s', type: %s" % (s, type(s)))

def make_uid_generator():
    ids = {}
    def get_id_for_year(year):
        if year in ids:
            ids[year] += 1
        else:
            ids[year] = 0
        return '%s-%s' % (year, ids[year])
    return get_id_for_year

uid_generator = make_uid_generator()

book = xlrd.open_workbook(file_contents=sys.stdin.read())
sheet = book.sheet_by_index(0)
print("Number of rows: " + str(sheet.nrows), file=sys.stderr)

fieldnames = [
    'year',
    'unique_id',
    'amount',
    'section',
    'entity',
    'programme',
    'concept'
]

writer = csv.DictWriter(sys.stdout, fieldnames)
writer.writeheader()

# U-202A is Left-to-Right-Embed (LRE)
# U-202C is Pop-Directional-Formatting (PDF)
fmt = u"{name} \u202a({id})\u202c"

for row in range(4, sheet.nrows): # for each row after the header
    l1_id = sheet.cell(row,0).value.strip()
    l1_name = sheet.cell(row,1).value.strip()
    l2_id = sheet.cell(row,2).value.strip()
    l2_name = sheet.cell(row,3).value.strip()
    l3_id = sheet.cell(row,4).value.strip()
    l3_name = sheet.cell(row,5).value.strip()
    l4_id = sheet.cell(row,6).value.strip()
    l4_name = sheet.cell(row,7).value.strip()

    # Expenditure appears to be measured in 1000s of shekels.
    expenditure_2009 = 1000 * to_float(unicode(sheet.cell(row,8).value))
    expenditure_2010 = 1000 * to_float(unicode(sheet.cell(row,13).value))

    for (year, exp) in ((2010, expenditure_2010),
                        (2009, expenditure_2009)):

        e = {
            'amount': exp,
            'year': year,
            'unique_id': uid_generator(year),
            'section':   fmt.format(name=l1_name, id=l1_id).encode('utf8'),
            'entity':    fmt.format(name=l2_name, id=l2_id).encode('utf8'),
            'programme': fmt.format(name=l3_name, id=l3_id).encode('utf8'),
            'concept':   fmt.format(name=l4_name, id=l4_id).encode('utf8')
        }

        writer.writerow(e)

