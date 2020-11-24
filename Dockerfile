FROM node:10-stretch-slim



#### Java

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    TZ=Asia/Jakarta \
    DEBIAN_FRONTEND=noninteractive \
    JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre

RUN { \
    echo "deb http://deb.debian.org/debian stretch main contrib"; \
    echo "deb http://deb.debian.org/debian stretch-updates main contrib"; \
    echo "deb http://security.debian.org stretch/updates main contrib"; \
    } > /etc/apt/sources.list \
    && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
    && mkdir -p /usr/share/man/man1 \
    && cp -R /bin/sh /bin/sh.orig~ \
    && ln -sf /bin/bash /bin/sh \
    && apt-get -y -o Acquire::Check-Valid-Until=false update \
    && apt-get -y -o Acquire::Check-Valid-Until=false --no-install-recommends install \
    make \
    python3 \
    openjdk-8-jre-headless \
    ttf-mscorefonts-installer \
    fontconfig \
    bzip2 \
    && apt-get -y -o Acquire::Check-Valid-Until=false autoremove \
    && apt-get -y -o Acquire::Check-Valid-Until=false clean \
    && { \
    echo "<?xml version=\"1.0\"?>"; \
    echo "<!DOCTYPE fontconfig SYSTEM \"fonts.dtd\">"; \
    echo "<fontconfig>"; \
    echo "  <!-- Use the Antialiasing -->"; \
    echo "  <match target=\"font\">"; \
    echo "    <edit name=\"antialias\" mode=\"assign\"><bool>true</bool></edit>"; \
    echo "  </match>"; \
    echo "</fontconfig>"; \
    } > /etc/fonts/conf.d/10-antialias.conf \
    && { \
    echo "<?xml version=\"1.0\"?>"; \
    echo "<!DOCTYPE fontconfig SYSTEM \"fonts.dtd\">"; \
    echo "<fontconfig>"; \
    echo "  <!-- Use Hinting -->"; \
    echo "  <match target=\"font\">"; \
    echo "    <edit name=\"hinting\" mode=\"assign\"><bool>true</bool></edit>"; \
    echo "  </match>"; \
    echo "</fontconfig>"; \
    } > /etc/fonts/conf.d/10-hinting.conf \
    && { \
    echo "<?xml version=\"1.0\"?>"; \
    echo "<!DOCTYPE fontconfig SYSTEM \"fonts.dtd\">"; \
    echo "<fontconfig>"; \
    echo "  <!-- Use Slight Hinting -->"; \
    echo "  <match target=\"font\">"; \
    echo "    <edit name=\"hintstyle\" mode=\"assign\"><const>hintslight</const></edit>"; \
    echo "  </match>"; \
    echo "</fontconfig>"; \
    } > /etc/fonts/conf.d/10-hinting-slight.conf \
    && fc-cache -fv



WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm i -g npm \
    && npm i

COPY . /usr/src/app/

#RUN chmod -R 777 tmp

EXPOSE 3455

CMD ["npm", "start"]