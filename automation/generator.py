import json

with open("data/content.json", "r", encoding="utf-8") as f:
    content = json.load(f)

#section for making cards

def addTags(tags):
    result = []
    for tag in tags:
        result.append(f'<a href="everything.html?filter={tag}">#{tag}</a>') #the f preserves formatting so I can use tag like a variable
    return "".join(result)

def addLinks(links):
    result = []
    for link in links:
        result.append(f'<a href={link} target= "_blank"> View Here </a>') #the f preserves formatting so I can use tag like a variable
    return "".join(result)

def makeCard(entry,everything):
    if everything:
        card = f'<div class=\"card mix-item\" data-tags = {" ".join(entry["tags"])}> \n '
    else:
        card = f'<div class=\"card\"> \n '
    if entry["image"]:
        card += f'<img src={entry["image"]}> \n '

    card +=       f'<h3>{entry["title"]}</h3> \n <p> {entry["description"]} </p> \n '
    if entry["links"]:
        newlinks = addLinks(entry['links'])
        card += f'{newlinks} \n '
    newtags = addTags(entry['tags'])
    card += f'{newtags} \n </div> \n'
    return card

#make the cards and move them to the right places
websiteSections = {"everything":[]} #stores the cards under the page and section they go in
pages = {"everything":[]} #essentially a sitemap, shows what sections each page has

for entry in content:
    # make a key to easily write it where it's supposed to go
    key = f'{entry["type"]}:{entry["category"]}'
    card = makeCard(entry, False)
    everything = makeCard(entry, True)
    if key in websiteSections:
        websiteSections[key].append(card)
    else:
        websiteSections[key]=[card]
    websiteSections["everything"].append(everything)

    if entry['type'] not in pages:
        pages[entry['type']]=[]

    if entry['category'] not in pages[entry['type']]:
        pages[entry['type']].append(entry['category'])



#now move the cards to the right places
for page in pages:
    #read HTML file for the correct page
    html_path = f"{page}.html"

    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    if page == 'everything':
        start = f"<!-- AUTO:everything:start -->"
        end = f"<!-- AUTO:everything:end -->"
        new_html = (
                html.split(start)[0]
                + start
                + " ".join(websiteSections['everything'])
                + end
                + html.split(end)[1]
        )
        

    else:
        for section in pages[page]:
        #move stuff to correct place with the start and end
            start = f"<!-- AUTO:{page}:{section}:start -->"
            end = f"<!-- AUTO:{page}:{section}:end -->"

            new_html = (
                    html.split(start)[0]
                    + start
                    + " ".join(websiteSections[f'{page}:{section}'])
                    + end
                    + html.split(end)[1]
            )
            #print(new_html)


    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
