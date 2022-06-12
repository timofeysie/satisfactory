import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const publisher = {
  name: 'Tundra 64',
  logoSrc: 'https://one-public-bucket.s3.ap-southeast-2.amazonaws.com/broken-image-228x228.png',
};

@Injectable()
export class StoryService {
  async create(createTrendDto: any) {
    await this.getGeneratedFileName(createTrendDto);
    const fileName = createTrendDto.pageTitle?.split(' ').join('-');
    if (fileName) {
      console.log('got filename', fileName);
      const story = await this.generateStory(createTrendDto);
      // const file = fs.createWriteStream(`posts/${fileName}.json`);
      // file.on('TrendsService.create: error', function (err) {
      //   /* error handling */
      //   console.log('TrendsService.create: err 1', err);
      // });
      // console.log(fileName, 'writing', createTrendDto);
      // file.write(JSON.stringify(createTrendDto));
      // file.end();

      return 'This action adds a new trend';
    } else {
      console.log('TrendsService.create: no pageTitle');
      return 'no pageTitle';
    }
  }

  async generateStory(createTrendDto) {
    const title1 = this.findTitle('one', createTrendDto);
    if (title1) {
      const oneS3 = await this.writeBucketFile(title1);
      if (oneS3) createTrendDto.one.s3 = oneS3;
    }
  }

  /**
   * Load the s3 file bucket info for AI generated images
   * TODO: needs to be modified if we want two images created by AIs.
   * @param createTrendDto form
   * @returns
   */
  async getGeneratedFileName(createTrendDto) {
    return `
    import props from "prop-types";
    import Head from "next/head";

export const config = { amp: true };

export default function Home() {
  const { data } = props;
  return (
    <>
      <Head>
        <title>${createTrendDto.title}</title>
        <script
          async
          key="amp-story"
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        />
      </Head>

      <amp-story
        standalone=""
        title="${createTrendDto.title}"
        publisher="${publisher.name}"
        publisher-logo-src="${publisher.logoSrc}"
        poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
        poster-square-src="https://amp.dev/static/samples/img/story_dog2_square.jpg"
        poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg"
      >
        <amp-story-page id="page-1">
          <amp-story-grid-layer template="fill">
            <amp-img
              src="https://amp.dev/static/samples/img/story_dog2.jpg"
              width="720"
              height="1280"
              layout="responsive"
            />
          </amp-story-grid-layer>
          <amp-story-grid-layer template="vertical">
            <h1>Hello World</h1>
            <p>This is an AMP Story.</p>
          </amp-story-grid-layer>
        </amp-story-page>

        <amp-story-page id="animation-demo">
          <amp-story-grid-layer template="fill">
            <amp-img
              src="https://amp.dev/static/samples/img/story_dog4.jpg"
              animate-in="fly-in-top"
              width="720"
              height="1280"
              layout="responsive"
            />
          </amp-story-grid-layer>
          <amp-story-grid-layer template="thirds">
            <h2
              animate-in="fly-in-bottom"
              grid-area="lower-third"
              animate-in-delay="0.4s"
            >
              Best walk ever!
            </h2>
          </amp-story-grid-layer>
        </amp-story-page>

        <amp-story-page id="layout-demo">
          <amp-story-grid-layer template="thirds">
            <amp-img
              grid-area="upper-third"
              src="https://amp.dev/static/samples/img/story_thirds_1.jpg"
              width="560"
              height="420"
              layout="responsive"
            />
            <amp-img
              grid-area="middle-third"
              src="https://amp.dev/static/samples/img/story_thirds_2.jpg"
              width="560"
              height="420"
              layout="responsive"
            />
            <amp-img
              grid-area="lower-third"
              src="https://amp.dev/static/samples/img/story_thirds_3.jpg"
              width="560"
              height="420"
              layout="responsive"
            />
          </amp-story-grid-layer>
        </amp-story-page>

        <amp-story-bookend
          src="https://amp.dev/static/samples/json/bookend.json"
          layout="nodisplay"
        />
      </amp-story>
    </>
  );
}
`;
  }

  async writeBucketFile(fileTitle) {
    const path = `./apps/nest-demo/src/app/gan/bucket/${fileTitle}.json`;
    // Check that the file exists locally
    if (!fs.existsSync(path)) {
      console.log('writeBucketFile: File not found', path);
      return null;
    }
    const s3file = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return s3file;
  }

  /**
   * Find the image chose which represents an s3 bucket file path.
   * @param pictureNumber one or two
   * @param createTrendDto the form
   * @returns
   */
  findTitle(pictureNumber, createTrendDto) {
    if (createTrendDto[pictureNumber].type === 'AI') {
      return createTrendDto[pictureNumber].imageChosen;
    }
  }
}
