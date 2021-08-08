import { Component, OnInit, Input } from '@angular/core';
import { Trend } from '@demo-app/data-models';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const BACK_ICON = `
  <svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:cc="http://web.resource.org/cc/" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" xmlns:ns1="http://sozi.baierouge.fr" id="svg1" sodipodi:docname="line_arrow_begin.svg" viewBox="0 0 60 60" sodipodi:version="0.32" version="1.0" y="0" x="0" inkscape:version="0.38.1" sodipodi:docbase="/home/danny/flat/scalable/actions">
  <sodipodi:namedview id="base" bordercolor="#666666" inkscape:pageshadow="2" inkscape:window-width="1016" pagecolor="#ffffff" snaptoguides="true" inkscape:zoom="6.9465337" inkscape:window-x="0" borderopacity="1.0" inkscape:cx="37.697540" inkscape:cy="17.130398" inkscape:window-y="0" inkscape:window-height="685" inkscape:pageopacity="0.0" showguides="true"/>
  <path id="path831" style="stroke-linejoin:round;stroke:#333333;stroke-linecap:round;stroke-width:5;fill:none" transform="translate(.17995 -.35989)" d="m4.6786 31.569h51.104" sodipodi:stroke-cmyk="(0.0000000 0.0000000 0.0000000 0.80000001)"/>
  <path id="path869" style="stroke-linejoin:round;fill-rule:evenodd;stroke:#333333;stroke-linecap:round;stroke-width:3.712;fill:#333333" d="m25.354 33.828l-12.919 9.281 12.61 10.313 0.309-19.594z" sodipodi:nodetypes="cccc" transform="translate(-8.9973 -11.876)" sodipodi:stroke-cmyk="(0.0000000 0.0000000 0.0000000 0.80000001)"/>
  <metadata>
    <rdf:RDF>
      <cc:Work>
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/"/>
        <dc:publisher>
          <cc:Agent rdf:about="http://openclipart.org/">
            <dc:title>Openclipart</dc:title>
          </cc:Agent>
        </dc:publisher>
        <dc:title>ftline arrow begin</dc:title>
        <dc:date>2011-01-31T02:01:42</dc:date>
        <dc:description>Originally uploaded by Danny Allen for OCAL 0.18 this icon is part of the flat theme</dc:description>
        <dc:source>https://openclipart.org/detail/113137/ftline-arrow-begin-by-anonymous</dc:source>
        <dc:creator>
          <cc:Agent>
            <dc:title>Anonymous</dc:title>
          </cc:Agent>
        </dc:creator>
        <dc:subject>
          <rdf:Bag>
            <rdf:li>flat</rdf:li>
            <rdf:li>icon</rdf:li>
            <rdf:li>theme</rdf:li>
          </rdf:Bag>
        </dc:subject>
      </cc:Work>
      <cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/">
        <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
        <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/>
        <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/>
      </cc:License>
    </rdf:RDF>
  </metadata>
</svg>
`;

@Component({
  selector: 'demo-app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrls: ['./trends-list.component.scss'],
})
export class TrendsListComponent implements OnInit {
  @Input() trends: Trend[];
  trendDetails: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral(
      'back',
      sanitizer.bypassSecurityTrustHtml(BACK_ICON)
    );
  }

  ngOnInit(): void {
    console.log('works');
  }

  seeTrend(trend: any): void {
    this.trendDetails = trend;
  }

  backToList() {
    this.trendDetails = null;
  }
}
